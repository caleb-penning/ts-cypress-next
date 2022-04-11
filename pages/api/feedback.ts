import type { NextApiRequest, NextApiResponse } from "next"

type Data = {
    feedback: string,
    email: string,
    created: boolean
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    if (req.body.email && req.body.feedback) {
        res.status(201).json({
            feedback: `${req.body.feedback}`,
            email: `${req.body.feedback}`,
            created: true
        })
    } 

    else {
        res.status(400).json({
            feedback: `Invalid Value Provided`,
            email: `email not valid or was not sent in request body`,
            created: false
        })
    }
}