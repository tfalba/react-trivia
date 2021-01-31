
function Category (props) {
  const { category } = props
  const { setCategory } = props

  return (
    <div className='flex-col'>
      <div className='category-card animate__animated animate__flipInY' onClick={() => setCategory(category)}>
        <div>{category.name}</div>
        <img className='image' src={category.coverImg} alt={`${category.name} logo`} />

      </div>
    </div>
  )
}

export default Category
