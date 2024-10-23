
const path = require("path")
const { Telegraf } = require("telegraf")
async function fet(url) {
  // Importa `node-fetch` dinámicamente
  const { default: fetch } = await import('node-fetch');
  
  // Realiza la solicitud a la API
  const response = await fetch(url);
  
  // Verifica si la respuesta es exitosa
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  
  // Retorna la respuesta JSON
  return response.json();
}

// En el contexto de tu código principal

//--no-bin-links



const msj = {
premium: "Nesesitas se usuario premium para utilizar este comando"
}
// Configuración del bot con token
const botToken = '7241847225:AAFMyln6xhYVbj_2YnHNGKUxoXC12lEC5pQ'; 
const bot = new Telegraf(botToken);

// ID del usuario administrador
const adminId = '5653464056';


bot.on('text', async (ctx) => {
    const textt = ctx.message.text.trim().toLowerCase(); 
    const args = textt.split(' '); 
    const prefix = "/";
    const command = args.shift().replace(prefix, ''); 
    const text = args.join(' ');
    const id = ctx.from.id;
    const reply = (text) => {
    ctx.reply(text)
    }
    const username = ctx.from.username ? `@${ctx.from.username}` : '';

    switch (command) {
        case "start":                
            reply(`[❗] Utiliza el comando ${prefix}menu`);
            break;

        case 'menu':
            const fechaActual = new Date();
            const dia = fechaActual.getDate();
            const mes = fechaActual.getMonth() + 1;
            const año = fechaActual.getFullYear();
            const fecha = `${dia}/${mes}/${año}`;
            const navidad = ["➣", "✨", "🌟", "☀️", "🫧", "🔥", "🩸", "⚡"];
            const e = navidad[Math.floor(Math.random() * navidad.length)];

            ctx.replyWithPhoto({ url: "https://tv-vivo.github.io/live/img/iconn.png" }, { caption: `
╭═══════|❏|═════⪩
┃     
┃ fecha: 「 ${fecha} 」
┃ nombre: 「 ${username} 」
┃ Owner: 「 @ANDRES_VPN 」
┃ prefijo: 「 ${prefix} 」
╰══════════════⪨
~∆ MOVIES ∆~
╭═══════|❏|═════⪩
┃
┃ ${e}${prefix}movie
┃ ${e}${prefix}streamwish
┃
╰══════════════⪨
            `});
            break;


case 'streamwish':
if(!text) return reply("[❗] ingrese la url de streamwish\nejemplo " + prefix + "streamwish https://playerwish.com/e/5rjbsqbqctls")
reply("[❗] Anuncios removidos\n"+"https://vpn-movie-ofc.blogspot.com/2024/05/embed_27.html?r=" + btoa(text))
break  

case 'subirhost':
if(!text) return reply("[❗] Ingresa una url de ( google dirve o mp4) para coonar la pelicula y subirla en la nube")

const sub = await fet(`https://api.streamwish.com/api/upload/url?key=16366xyjr0ya4d8f65qa2&url=${text}`)
if (sub.status === 200 && sub.msg === "OK") {
var url = `https://playerwish.com/e/${sub.filecode}`
reply("[❗] Pelicula subida con exito, puede tardar 5 minutos en verce en el enlace: \n https://vpn-movie-ofc.blogspot.com/2024/05/embed_27.html?r=" + btoa(url))
} else {
reply("[❗] Ocurrio un error")
}
break

          
 case 'movie':
  if (!text) return reply(`[❗] Ingresa el nombre de la película\nEjemplo: ${prefix}movie batman`);
  try{
    const apiKey = "1f098c7d68777348425d008055475b88";
      // Llama a la función fet y pasa la URL completa
      const data = await fet(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${text}`);
      const res = await fet(`https://api.themoviedb.org/3/movie/${data.results[0].id}?api_key=${apiKey}&language=es-MX`);
            const posterUrl = `https://image.tmdb.org/t/p/w500/${res.poster_path}`;
             const duration = convertMinutes(res.runtime);
      // Accede a los datos JSON y responde
function convertMinutes(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
}
const vvoteAverage = res.vote_average
const Star = (voteAverage) => {        
    const ratingOutOfFive = Math.round(voteAverage / 2);
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= ratingOutOfFive) {
            stars += '★'; // Estrella llena
        } else {
            stars += '☆'; // Estrella vacía
        }
    }

    return stars;
};
const starRating = Star(vvoteAverage);
      var rtx = `
╭═══════|❏|═════⪩
┃ MOVIE DB
╰══════════════⪨
╭═══════|❏|═════⪩
┃
┃ ID: ${data.results[0].id}
┃ TITULO: ${res.title}
┃ DURACION: ${duration}
┃ CALIFICACION: ${starRating}
┃═══════|❏|═════
    ${res.overview}
╰══════════════⪨
      `;
      ctx.replyWithPhoto({ url: posterUrl }, { caption: rtx })
  .catch(e => {
    reply(rtx);
  });
      
    } catch (error) {
      console.error('Error:', error);
      reply('[❗] Hubo un problema al buscar la película.');
    }
  break
  
        case 'id':
            const userId = ctx.from.id;

            ctx.reply('Aquí está tu ID de Telegram:', {
                reply_markup: {
                    inline_keyboard: [
                        [
                            { text: 'Copiar ID', callback_data: `copy_${userId}` }
                        ]
                    ]
                }
            });
            break;



        case 'sendvideo':
            ctx.replyWithVideo('https://www.example.com/video.mp4');
            break;
            
        case 'sendaudio':
            ctx.replyWithAudio('https://www.example.com/audio.mp3');
            break;


        default:
            ctx.reply('[❗] Comando incorrecto, ingresa ' + prefix + "menu");
        }

        
    
});

// Lanzar el bot
bot.launch();

// Manejo de botones
bot.on('callback_query', async (ctx) => {
    const data = ctx.callbackQuery.data;
    if (data.startsWith('copy_')) {
        const userId = data.split('_')[1];
        await ctx.answerCbQuery(); // Responde al callback para eliminar el spinner
        await ctx.reply(`Tu ID de Telegram es: ${userId}`); // Envía el ID de Telegram
    }
});

// Manejar la detención del bot de manera adecuada
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));