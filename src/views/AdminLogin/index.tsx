import { Logo } from '@/components/Logo/Logo'

export function AdminLoginView() {
  return (
    <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', marginTop: 40 }}>
      <Logo size="large" />
      {/* The default Payload login form will be rendered below this logo */}
      <div style={{ marginTop: 32 }} />
    </div>
  )
}

export default AdminLoginView
