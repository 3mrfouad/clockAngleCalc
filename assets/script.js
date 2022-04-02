const hrs = document.querySelector('#hrs')
const mins = document.querySelector('#mins')
const calcBtn = document.querySelector('#calc-btn')
const angle = document.querySelector('#angle')
const hrsArm = document.querySelector('#hrs-arm')
const minsArm = document.querySelector('#mins-arm')

const getClockArmAngles = (hrs, mins) => {
  const hrsAngle = (hrs % 12) * 30 + mins / 2
  const minsAngle = mins * 6
  return { hrsAngle, minsAngle }
}

const calculateClockAngle = (hrs, mins) => {
  const { hrsAngle, minsAngle } = getClockArmAngles(hrs, mins)
  return Math.abs(minsAngle - hrsAngle)
}

const setClockArms = (hrs, mins) => {
  const { hrsAngle, minsAngle } = getClockArmAngles(hrs, mins)
  hrsArm.style.transform = `rotate(${hrsAngle + 90}deg)`
  minsArm.style.transform = `rotate(${minsAngle + 90}deg)`
}

const handleChange = (hrs, mins, angle) => {
  const hours = parseInt(hrs.value, 10)
  const minutes = parseInt(mins.value, 10)

  if (hours > 24 || hours < 0 || minutes < 0 || minutes > 60) {
    angle.value = 'Invalid'
    return
  }
  angle.value = `${calculateClockAngle(hours, minutes)}°`
  setClockArms(hours, minutes)
}

const resetHrsArm = hrs => {
  if (hrs.value == 24) {
    hrs.value = 0
  }
}

const resetMinsArm = mins => {
  if (mins.value == 60) {
    hrs.value++
    mins.value = 0
  }
}

calcBtn.addEventListener('click', handleChange)

hrs.addEventListener('change', () => {
  handleChange(hrs, mins, angle)
  resetHrsArm(hrs)
})

mins.addEventListener('change', () => {
  handleChange(hrs, mins, angle)
  resetMinsArm(mins)
})
