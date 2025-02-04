import { useNavigate } from "@remix-run/react"

const Logo = () => {
  const navigate = useNavigate()
  return (
    <div className={'w-full flex justify-center items-center'}>
      <p onClick={() => navigate('/')} className={'w-36 font-bold cursor-pointer'}>Jotted <sup className={'text-dark_pink font-normal'}>by Christine</sup></p>
    </div>
  )
}

export default Logo