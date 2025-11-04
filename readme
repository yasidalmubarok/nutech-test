# Nutech Test - Backend API

RESTful API untuk aplikasi manajemen transaksi dan balance menggunakan Express.js dan PostgreSQL.

## 🚀 Features

- **Authentication** - Register & Login dengan JWT
- **Balance Management** - Top up dan cek saldo
- **Transaction** - Pembayaran layanan dan riwayat transaksi
- **Services & Banners** - Daftar layanan dan banner promosi

## 🛠️ Tech Stack

- **Node.js** & **Express.js**
- **PostgreSQL**
- **JWT** untuk authentication
- **Bcrypt** untuk password hashing
- **Swagger** untuk API documentation

## 📋 Prerequisites

- Node.js >= 18.x
- npm
- PostgreSQL
- Docker & Docker Compose (optional)

## ⚙️ Installation

### 1. Clone repository

```bash
git clone <repository-url>
cd nutech-test
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Copy `.env.example` ke `.env` dan isi dengan konfigurasi Anda:

```bash
cp .env.example .env
```

Edit `.env`

### 4. Setup Database

**Jalankan DDL untuk membuat tabel:**

```bash
# Jika menggunakan Supabase, copy SQL dari file DDL
# dan jalankan di SQL Editor di Supabase Dashboard

# Atau jika menggunakan PostgreSQL lokal:
psql -U postgres -d your_database < src/migrations/ddl.sql
```

**Lokasi file DDL:** `src/migrations/ddl.sql`

File ini berisi:
- Table `users` - Data pengguna
- Table `services` - Daftar layanan
- Table `banners` - Banner promosi
- Table `transactions` - Riwayat transaksi

### 5. Run aplikasi

```bash
# Development mode
npm run dev

# Production mode
npm start
```

Server akan berjalan di `http://localhost:3000`

## 🐳 Docker Setup (Optional)

### 1. Build dan run dengan Docker Compose

```bash
docker-compose up -d
```

### 2. Stop containers

```bash
docker-compose down
```

## 📚 API Documentation

Akses Swagger UI untuk dokumentasi lengkap API:

```
http://localhost:3000/api/docs
```

## 🔑 API Endpoints

### Authentication

- `POST /api/auth/register` - Register user baru
- `POST /api/auth/login` - Login user

### Profile

- `GET /api/profile` - Get user profile (protected)
- `PUT /api/profile/update` - Update profile (protected)
- `PUT /api/profile/image` - Update profile image (protected)

### Balance

- `GET /api/balance` - Get saldo (protected)
- `POST /api/topup` - Top up saldo (protected)

### Transaction

- `POST /api/transaction` - Bayar layanan (protected)
- `GET /api/transaction/history` - Riwayat transaksi (protected)

### Services & Banners

- `GET /api/services` - List semua layanan
- `GET /api/banner` - List semua banner

## 📁 Project Structure

```
nutech-test/
├── src/
│   ├── controllers/       # Request handlers
│   ├── services/          # Business logic
│   ├── repositories/      # Database queries
│   │   ├── auth/
│   │   ├── balance/
│   │   ├── banner/
│   │   ├── service/
│   │   └── transaction/
│   ├── middlewares/       # JWT, validation, upload
│   ├── routes/            # API routes
│   ├── utils/             # Helper functions
│   ├── validators/        # Input validation
│   └── migrations/        # Database migrations
│       └── ddl.sql        # ⭐ Database schema
├── docs/                  # Swagger documentation
├── uploads/               # Uploaded files
├── app.js                 # Express app setup
├── package.json
├── Dockerfile
└── docker-compose.yml
```

## 🔒 Authentication

API menggunakan **JWT Bearer Token**. Setelah login, gunakan token di header:

```
Authorization: Bearer <your-token>
```

## 📝 Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `3000` |
| `DATABASE_URL` | PostgreSQL connection string | - |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXPIRES_IN` | JWT expiration time | `12h` |
| `SALT_ROUNDS` | Bcrypt salt rounds | `10` |

## 🐛 Troubleshooting

### Database connection error

1. Pastikan `DATABASE_URL` benar
2. Cek Supabase project tidak di-pause
3. Verifikasi SSL config: `rejectUnauthorized: false`

### JWT token invalid

1. Pastikan `JWT_SECRET` sama di `.env`
2. Token sudah expire, login ulang
3. Format header: `Bearer <token>`

### Upload file error

1. Folder `uploads/` harus ada dan writable
2. Max file size: 100KB
3. Allowed format: jpeg, jpg, png

## 📄 License

MIT

## 👤 Author

Your Name

---

**Happy Coding! 🚀**