import Socials from "../atoms/Socials"

const Footer = () => {
  return (
    <div className={'w-full h-40 flex flex-col items-center justify-end pb-6'}>
        <p className={'font-bold pb-3'}>&copy; Jotted <sup className={'text-dark_pink font-normal'}>by Christine</sup></p>
        <Socials/>
    </div>
  )
}

export default Footer