export default async (req, res) => {
    if (req.method === 'POST') {
      const { name, phone, message } = req.body;
  
      // Kirim data ke Google Sheets via Apps Script Web App
      const googleSheetsResponse = await fetch('https://script.google.com/macros/s/1dPHciH8zj40LLI1mlPgLUoYmYl-ra8IuBXqL3dXcHgE/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          phone: phone,
          message: message
        })
      });
  
      if (!googleSheetsResponse.ok) {
        return res.status(500).json({ error: 'Failed to save data to Google Sheets' });
      }
  
      // Kirim notifikasi ke WhatsApp
      const whatsappResponse = await fetch("https://api.whatsapp.com/send?phone=081284478928&text=" + encodeURIComponent(`New inquiry from ${name}: ${message}. Contact: ${phone}`), {
        method: 'GET', // Menggunakan GET untuk URL WhatsApp
      });
  
      if (!whatsappResponse.ok) {
        return res.status(500).json({ error: 'Failed to send WhatsApp message' });
      }
  
      res.status(200).json({ success: true, message: 'Form submitted successfully!' });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  };
  