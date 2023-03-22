export const profileHTML = (body: any) => {
  return `<strong>Here' your account information:</strong>
  \nFirst name: ${body.firstName}
  \nLast name: ${body.lastName}
  \nEmail: ${body.email}
  \nPhone: ${body.phone}`;
};