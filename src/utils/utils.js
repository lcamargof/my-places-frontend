export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => (
        resolve([position.coords.longitude, position.coords.latitude])
      ), () => reject());
    } else {
      reject();
    }
  });
};