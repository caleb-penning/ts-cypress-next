import React, { useState, useEffect } from "react"
import axios from "axios"

const FeedbackPage = (): JSX.Element => {
    const [formData, setFormData] = useState({
        email: "",
        feedback: ""
    })
    const [hasSubmit, setHasSubmit] = useState(false)
    const [err, setErr] = useState(false)

    useEffect(() => {
        const checkIfHasSubmit = () => {
            const email = localStorage.getItem("email")
            if (email) setHasSubmit(true)
            else return
        }
        checkIfHasSubmit()
    }, [])

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget

        setFormData(data => ({
            ...data,
            [name]: value
        }))
    }
    
    const handleSubmit = async (e: React.SyntheticEvent) => {
        e.preventDefault()

        if (formData.email && formData.feedback) {
            const res = await axios.post("/api/feedback", formData)
            
            if (res.status === 201) {
                localStorage.setItem("email", formData.email)
                setHasSubmit(true)
            }

            else setErr(true)
        }
    }

    if (!hasSubmit) return (
        <div className="feedback-form">
            {err && <p>There was an error sending your data. Please refresh and try again</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email Address"
                    onChange={handleChange}
                    value={formData.email}
                />

                <input 
                    type="text" 
                    name="feedback" 
                    placeholder="Enter Feedback Here"
                    onChange={handleChange}
                    value={formData.feedback}
                />

                <input type="submit" value="Submit Feedback" />
            </form>
        </div>
    )

    else return (
        <div className="feedback-complete">
            <h3>Thank you for your feedback!</h3>
            <a href="/">Go Home</a>
        </div>
    )
}

export default FeedbackPage