export default function LoginPage() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <div style={{ width: 300 }}>
        <h1>Login Admin</h1>

        <input placeholder="Email" style={{ width: "100%", padding: 10, marginTop: 10 }} />
        <input placeholder="Password" type="password" style={{ width: "100%", padding: 10, marginTop: 10 }} />

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