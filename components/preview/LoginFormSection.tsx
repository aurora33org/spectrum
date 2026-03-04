export function LoginFormSection() {
  return (
    <div className="max-w-sm mx-auto">
      <div
        className="rounded-xl p-6 border"
        style={{
          backgroundColor: "var(--p-surface-1)",
          borderColor: "var(--p-border)",
        }}
      >
        {/* Logo mark */}
        <div
          className="w-8 h-8 rounded-lg mb-4 flex items-center justify-center text-white text-sm font-bold"
          style={{ backgroundColor: "var(--p-accent)" }}
        >
          A
        </div>

        <h3 className="text-sm font-semibold mb-1" style={{ color: "var(--p-text-1)" }}>
          Sign in to your account
        </h3>
        <p className="text-xs mb-4" style={{ color: "var(--p-text-2)" }}>
          Enter your credentials to continue
        </p>

        {/* Email */}
        <div className="mb-3">
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--p-text-2)" }}>
            Email address
          </label>
          <div
            className="w-full h-9 rounded-md border px-3 flex items-center text-xs"
            style={{
              borderColor: "var(--p-border)",
              backgroundColor: "var(--p-surface-2)",
              color: "var(--p-text-1)",
            }}
          >
            alice@example.com
          </div>
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-xs font-medium block mb-1" style={{ color: "var(--p-text-2)" }}>
            Password
          </label>
          <div
            className="w-full h-9 rounded-md border px-3 flex items-center text-xs"
            style={{
              borderColor: "var(--p-border)",
              backgroundColor: "var(--p-surface-2)",
              color: "var(--p-text-2)",
            }}
          >
            ••••••••
          </div>
        </div>

        {/* Submit */}
        <button
          className="w-full h-9 rounded-md text-sm font-medium text-white"
          style={{ backgroundColor: "var(--p-accent)" }}
        >
          Sign in
        </button>

        <p className="text-center text-xs mt-3" style={{ color: "var(--p-text-2)" }}>
          Don&apos;t have an account?{" "}
          <span className="font-medium" style={{ color: "var(--p-accent)" }}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
