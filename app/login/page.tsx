import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { auth, signIn } from "../utils/auth";
import { SubmitButtons } from "@/components/SubmitButtons";

export default async function Login() {
    const session = await auth();

    if (session?.user) {
        redirect("/dashboard");
    }
    return (
        <>
            <div className="flex h-screen w-full items-center justify-center px-4">
                <Card className="max-w-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl">Login</CardTitle>
                        <CardDescription>
                            Enter your email below to login to your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form
                            className="flex flex-col gap-y-4"
                            action={async (formData) => {
                                "use server";
                                await signIn("nodemailer", formData);
                            }}>
                            <div className="flex flex-col gap-y-2">
                                <Label>Email</Label>
                                <Input
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="hello@example.com" />
                            </div>
                            <SubmitButtons text="Login" />
                        </form>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};