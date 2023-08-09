const generateSteps = () => {
  const result = [...Array(5)].map((_, i) => {
    const data = (i + 1) * 3
    return data
  })
  return result
}

export { generateSteps }