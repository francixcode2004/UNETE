import { useState } from "react"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Label } from "../components/ui/Label"
import {register} from "../services/users_api"
import { ToastNotification } from "../components/ToastNotification";
import { ToastContainer } from 'react-toastify';
import {useNavigate } from "react-router-dom";
export function RegisterForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    })
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password === formData.confirmPassword) {
            const response = await register(formData.username, formData.password);
            if (response.success) {
                // Notificación de éxito
                ToastNotification({ type: "success", message: response.message });
                navigate("/login")
            } else {
                // Notificación de error
                ToastNotification({ type: "error", message: response.error });
                console.error(response.error);
            }
        } else {
            ToastNotification({ type: "error", message: "Las contraseñas no coinciden." });
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        })
    }

    return (
        <>
            <div className="mx-auto max-w-sm space-y-6 p-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-semibold">Sign UP</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="username">User Name:</Label>
                        <Input id="username" placeholder="johndoe" value={formData.username} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password:</Label>
                        <Input id="password" type="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm password:</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full bg-black text-white">
                        SIGN UP
                    </Button>
                </form>
            </div>
            <ToastContainer />
        </>
    )
}
export default RegisterForm
