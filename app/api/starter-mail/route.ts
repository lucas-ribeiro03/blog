"use server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const { email, name, lastName } = await req.json();
  console.log("email", email);
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

    console.log(email, name, lastName);
    await transporter.sendMail({
      from: `"BLOG" <${process.env.USER_MAIL}>`,
      to: email,
      subject: "Bem vindo ao BLOG!",
      html: `<!DOCTYPE html><html lang="pt-BR"><head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1.0"> <title>Bem-vindo(a) à Nossa Comunidade!</title> <style> body { font-family: Arial, sans-serif; line-height: 1.6; color: #333333; background-color: #f4f4f4; margin: 0; padding: 0; } .container { max-width: 600px; margin: 20px auto; padding: 20px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } h1 { color: #0056b3; text-align: center; margin-bottom: 20px; } p { margin-bottom: 15px; } a { color: #007bff; text-decoration: none; } a:hover { text-decoration: underline; } .footer { text-align: center; margin-top: 30px; font-size: 0.9em; color: #777777; } </style></head><body> <div class="container"> <h1>Bem-vindo(a) à Nossa Comunidade!</h1> <p>Olá ${name} ${lastName},</p> <p>É com grande satisfação que lhe damos as boas-vindas à nossa comunidade! Gostaríamos de expressar nossa sincera gratidão por ter cadastrado seu e-mail para receber as últimas atualizações sobre nossos novos posts.</p> <p>Estamos muito animados para compartilhar com você conteúdo relevante e inspirador. Nossa equipe trabalha arduamente para trazer artigos, tutoriais e insights que acreditamos que serão de grande valor para você.</p> <p>Fique atento(a) à sua caixa de entrada! Em breve, você começará a receber nossas newsletters com os posts mais recentes, notícias e talvez até algumas ofertas exclusivas para nossos assinantes.</p> <p>Enquanto isso, sinta-se à vontade para explorar nosso conteúdo atual em <a href="http://localhost:3000">Blog</a>.</p> <p>Se tiver alguma dúvida ou sugestão, não hesite em nos contatar. Estamos sempre abertos a ouvir você.</p> <p>Mais uma vez, obrigado(a) por fazer parte da nossa jornada!</p> <p>Atenciosamente,</p> <div class="footer"> <p>A Equipe BLOG</p> <p><a href="http://localhost:3000">Blog</a></p> </div> </div></body></html>`,
    });

    const mailSignedUserInfo = { email, name, lastName };
    const cookieStore = await cookies();
    cookieStore.set("emailSigned", JSON.stringify(mailSignedUserInfo), {
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return NextResponse.json(
      { message: "Email enviado com sucesso" },
      { status: 200 },
    );
  } catch (e) {
    return NextResponse.json({ message: "ERRO:", e });
  }
}
