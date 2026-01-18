interface PasswordRequirementsProps {
  password: string
  confirmPassword: string
}

export function PasswordRequirements({
  password,
  confirmPassword,
}: PasswordRequirementsProps) {
  const requirements = [
    {
      label: "Mínimo de 8 caracteres",
      met: password.length >= 8,
    },
    {
      label: "1 letra maiúscula",
      met: /[A-Z]/.test(password),
    },
    {
      label: "1 letra minúscula",
      met: /[a-z]/.test(password),
    },
    {
      label: "1 número",
      met: /[0-9]/.test(password),
    },
    {
      label: "1 caractere especial",
      met: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
    },
    {
      label: "Senhas coincidem",
      met: password === confirmPassword && password.length > 0,
    },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 mb-6" style={{ width: "400px" }}>
      {requirements.map((req, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center transition-colors"
          >
            {req.met ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#CDEA80"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#EF4444"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            )}
          </div>
          <span className="text-sm text-white">
            {req.label}
          </span>
        </div>
      ))}
    </div>
  )
}
