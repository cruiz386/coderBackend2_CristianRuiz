import { transporter } from "../services/email.service.js"

export const sendGmailRegister = async (req, res) => {
    try {
        const { dest, name } = req.body;
        const gmailConfig = {
            from: process.env.EMAIL_USER,
            to: dest,
            subject: "Bienvenido a nuestra tienda",
            html: `<h1>Gracias por registrarte, ${name}!</h1>`,
        };

        const response = await transporter.sendMail(gmailConfig);


        if (res) {
            return res.json(response);
        }

        return response;
    } catch (error) {
        console.error("Error to send email:", error);
        if (res) {
            res.status(500).json({ error: "Error to send email" });
        }
        throw error;
    }
};



export const sendGmailPurchase = async (emailBody) => {
    try {
        const { dest, name, subject, html } = emailBody;

        if (!dest || !name || !subject || !html) {
            throw new Error("One or more required fields are missing.");
        }

        const gmailConfig = {
            from: process.env.EMAIL_USER,
            to: dest,
            subject: subject,
            html: html,
        };

        const response = await transporter.sendMail(gmailConfig);

        console.log("Response from sendMail:", response);

        if (response.accepted && response.accepted.length > 0) {
            console.log("eMail sent successfully.");
        } else {
            throw new Error("Error sending eMail.");
        }
    } catch (error) {
        console.error(" Error to send email:", error);
        throw error;
    }
};

