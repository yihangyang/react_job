// bewerber page(/bewerber), arbeitergeber page(/geber)
// bewerber datacomplete(/bewerberinfo), arbeitergeber datacomplete(/geberinfo)
// check whether go to complete: user.header
// check user type: user.type
export function getRedirectTo(type, header) {
  let path = ''
  // type
  if(type==='bewerber') {
    path= '/bewerber'
  } else {
    path= '/geber'
  }
  // header
  if(!header) {
    path += 'info'
  }
  return path
}