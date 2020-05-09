import cookies from 'js-cookie';

export default function removeCookies(cookiesCollection: string[]): void {
  cookiesCollection.forEach((cookie) => cookies.remove(cookie));
}
