import './style.css'

interface Props {
  category: string
  positions: number
}

const CategoryCard
  = ({ category, positions }: Props) => {
    return (
      <div className="category-card" >
        <p className='job-title'>{category}</p>
        <p>{positions} Open Positions</p>
      </div>
    )
  }

export default CategoryCard

