"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createSession, clearSession } from "@/lib/auth/session";
import {
  createPasswordResetToken,
  createUser,
  findPasswordResetToken,
  findUserByEmail,
  markPasswordResetTokenUsed,
  updateUserPassword,
  verifyUserCredentials,
} from "@/lib/auth/users";
import {
  type AuthFormState,
  forgotPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "@/lib/auth/validation";

export async function signUp(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const validatedFields = signUpSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please fix the highlighted fields.",
    };
  }

  const existingUser = await findUserByEmail(validatedFields.data.email);

  if (existingUser) {
    return {
      errors: {
        email: ["An account already exists for this email."],
      },
      message: "Try signing in instead.",
    };
  }

  const user = await createUser(validatedFields.data);

  await createSession({
    userId: user.id,
    email: user.email,
    name: user.name,
  });

  revalidatePath("/");
  redirect("/dashboard");
}

export async function signIn(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const validatedFields = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Enter your email and password to continue.",
    };
  }

  const user = await verifyUserCredentials(
    validatedFields.data.email,
    validatedFields.data.password,
  );

  if (!user) {
    return {
      message: "Invalid email or password.",
    };
  }

  await createSession({
    userId: user.id,
    email: user.email,
    name: user.name,
  });

  revalidatePath("/");
  redirect("/dashboard");
}

export async function signOut() {
  await clearSession();
  revalidatePath("/");
  redirect("/signin");
}

export async function requestPasswordReset(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const validatedFields = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Enter the email address for your account.",
    };
  }

  const user = await findUserByEmail(validatedFields.data.email);

  if (!user) {
    return {
      success:
        "If an account exists for that email, a reset link is now ready.",
    };
  }

  const token = await createPasswordResetToken(user.id);
  const resetUrl = `/reset-password?token=${token}`;

  return {
    success:
      "Password reset prepared. In production this would be emailed to the user.",
    resetUrl,
  };
}

export async function resetPassword(
  _state: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const validatedFields = resetPasswordSchema.safeParse({
    token: formData.get("token"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Choose a valid new password to continue.",
    };
  }

  const resetToken = await findPasswordResetToken(validatedFields.data.token);

  if (!resetToken) {
    return {
      errors: {
        token: ["This reset link is invalid or has expired."],
      },
      message: "Request a fresh password reset link and try again.",
    };
  }

  await updateUserPassword(resetToken.userId, validatedFields.data.newPassword);
  await markPasswordResetTokenUsed(resetToken.id);

  return {
    success: "Password updated successfully. You can sign in with the new password.",
  };
}
