import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { title, excerpt, slug, email, name, lastName } = await req.json();
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: true,
      auth: {
        user: process.env.USER_MAIL,
        pass: process.env.USER_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"BLOG" <${process.env.USER_MAIL}>`,
      to: email,
      subject: "Novo post!",
      html: `<!DOCTYPE html><html lang=\"pt-BR\"><head> <meta charset=\"UTF-8\"> <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"> <title>Novo Post no Blog!</title> <style> body { font-family: Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); text-align: center; } h1 { color: #0056b3; margin-bottom: 20px; } h2 { color: #333333; margin-bottom: 15px; } p { margin-bottom: 15px; } .button { display: inline-block; background-color: #28a745; color: #ffffff; padding: 10px 20px; margin-top: 20px; border-radius: 5px; text-decoration: none; font-weight: bold; } .button:hover { background-color: #218838; } .footer { margin-top: 30px; font-size: 0.9em; color: #777777; } a { color: #007bff; text-decoration: none; } a:hover { text-decoration: underline; } </style></head><body> <div class=\"container\"> <h1>Temos Novidades no Blog!</h1> <p>Olá ${name} ${lastName},</p> <p>Temos o prazer de informar que um novo post foi publicado em nosso blog!</p> <h2>${title}</h2> <p>${excerpt}</p> <a href=\"http://localhost:3000/post/${slug}\" class=\"button\">Leia o Post Completo</a> <p style=\"margin-top: 20px;\">Esperamos que você goste do novo conteúdo!</p> <div class=\"footer\"> <p>Atenciosamente,</p> <p>A Equipe BLOG</p> <p><a href=\"http://localhost:3000\">http://localhost:3000</a></p> <p>Você está recebendo este e-mail porque se inscreveu para receber atualizações do nosso blog. Se não deseja mais receber, você pode <a href=\"[Link para Cancelar Inscrição]\">cancelar sua inscrição aqui</a>.</p> </div> </div></body></html>`,
    });

    return NextResponse.json(
      {
        message: "MENSAGEM ENVIADA!",
      },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json({ message: "ERRO!! " + e });
  }
}
