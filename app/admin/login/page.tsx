export default function LoginPage() {
  return (
    <main style={{ 
      minHeight: "100vh",
      display: "grid",
      placeItems: "center"
    }}>
      <div style={{ width: 320 }}>
        <h1>Admin Login</h1>

        <input
          placeholder="Email"
          style={{ width: "100%", padding: 10, marginTop: 20 }}
        />

        <input
          type="password"
          placeholder="Password"
          style={{ width: "100%", padding: 10, marginTop: 10 }}
        />

        <button
          style={{
            width: "100%",
            padding: 12,
            marginTop: 20,
            background: "black",
            color: "white",
            border: "none",
            cursor: "pointer"
          }}
        >
          Entrar
        </button>
      </div>
    </main>
  );
}