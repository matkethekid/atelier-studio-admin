import LoginComponent from '@/components/LoginComponent';

const page = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-muted">
      <div className="w-full max-w-sm p-3">
        <LoginComponent />
      </div>
    </div>
  )
}

export default page;