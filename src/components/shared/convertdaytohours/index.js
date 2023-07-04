const convertDurationToHours = (duration) => {
  switch (duration) {
    case '4hr':
      return 4
    case '12hr':
      return 12
    case '24hr':
      return 24
    case '3d':
      return 24 * 3
    case '1w':
      return 24 * 7
    default:
      return 0
  }
}
export default convertDurationToHours
