import './style.css'

interface Props {
  title: string
  info: string
}

const HomeTitlesCard = ({ title, info }: Props) => {
  return (
    <div className='category-header'>
      <p className='category-title'>{title}</p>
      <p>{info}</p>
    </div>
  )
}

export default HomeTitlesCard
