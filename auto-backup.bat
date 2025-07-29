@echo off
:loop
:: Mendapatkan tanggal dan waktu dalam format dd:mm:yy hh:mm
set day=%date:~0,2%
set month=%date:~3,2%
set year=%date:~8,2%
set hour=%time:~0,2%
set minute=%time:~3,2%

:: Menghilangkan spasi pada jam jika ada
if "%hour:~0,1%"==" " set hour=0%hour:~1,1%

:: Membuat pesan commit dengan format waktu
set commit_message=%day%:%month%:%year% %hour%:%minute%

:: Menjalankan perintah git
git add .
git commit -m "%commit_message%"
git push origin main

echo Commit dan push selesai dengan pesan: %commit_message%
echo Menunggu 5 jam untuk eksekusi berikutnya...

:: Delay 5 jam (5 jam = 18000 detik)
timeout /t 18000 /nobreak

:: Kembali ke awal loop
goto loop