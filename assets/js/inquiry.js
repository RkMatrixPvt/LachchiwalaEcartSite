        const submitBtn = document.getElementById("submitBtn");
        const btnText = submitBtn.querySelector(".btn-text");
        const btnLoader = submitBtn.querySelector(".btn-loader");
        const form = document.getElementById("contactForm");
        const messageEl = document.getElementById("formMessage");

        form.addEventListener("submit", async function (e) {
            e.preventDefault();

            const name = form.name.value;
            const email = form.email.value;
            const phone = form.phone.value;
            const reason = form.reason.value;
            const message = form.message.value;
            const date = new Date().toLocaleString();
            const to = 'lachchhiwala@gmail.com';
            const subject = `New Contact Form Submission from ${name} – ${date} – Lachchhiwala's`;

            const htmlBody = `<!DOCTYPE html>
<html>
<head>
<style>
.box { border: 2px solid #4CAF50; padding: 20px; font-family: Arial, sans-serif; border-radius: 10px; background: #f9f9f9; }
h1 { color: #4CAF50; }
p { font-size: 16px; color: #333; margin: 6px 0; }
</style>
</head>
<body>
<div class="box">
      <h1>📩 New Inquiry Received</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Reason:</strong> ${reason}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
      <p><strong>Date:</strong> ${date}</p>
      <hr>
      <p>This message was submitted via the Lachchhiwala's Contact Us page.</p>
</div>
</body>
</html>`;

            const body = encodeURIComponent(htmlBody);
            const formData = `to=${to}&subject=${encodeURIComponent(subject)}&body=${body}`;

            // Show loader
            submitBtn.disabled = true;
            btnText.style.display = "none";
            btnLoader.style.display = "inline-block";

            try {
                const res = await fetch(
                    "https://script.google.com/macros/s/AKfycbwSd30sqPypp2MkPdiESpoIAzl30Sphu6qTA7V6_qratU4Wc1MklUbvnuKgWsfWEFmV/exec",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/x-www-form-urlencoded" },
                        body: formData,
                    }
                );

                await res.text();

                messageEl.innerHTML =
                    "✅ <strong>Thanks for contacting Lachchhiwala's!</strong> 🎉 Your inquiry is on its way to our team. We’ll respond promptly.";
                messageEl.style.backgroundColor = "#4caf50";
                messageEl.style.color = "#fff";
                messageEl.style.display = "block";

                form.reset();
            } catch (err) {
                messageEl.innerHTML =
                    "❌ Oops! Something went wrong. Please try again later.<br>📞 You can also contact Lachchhiwala directly:<br>📧 Email: lachchhiwala@gmail.com<br>📱 Phone: +91 73101 41205";
                messageEl.style.backgroundColor = "#e53935";
                messageEl.style.color = "#fff";
                messageEl.style.display = "block";
            } finally {
                submitBtn.disabled = false;
                btnText.style.display = "inline-block";
                btnLoader.style.display = "none";
            }

            setTimeout(() => {
                messageEl.style.display = "none";
            }, 6000);
        });