import { Store } from 'react-notifications-component'

export const addNotification = (
  message,
  duration = 1000,
  onScreen = true,
  type
) => {
  Store.addNotification({
    title: message || 'Something went wrong',
    type,
    insert: 'top',
    container: 'bottom-center',
    animationIn: ['animate__animated', 'animate__fadeIn'],
    animationOut: ['animate__animated', 'animate__fadeOut'],
    dismiss: {
      duration,
      onScreen
    }
  })
}
