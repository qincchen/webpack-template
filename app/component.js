export class Foo {

  testMethod() {
    const element = document.createElement('h1');

    element.innerHTML = 'Hello world';

    return element;
  }

}

export default function() {
  const div = document.createElement('div');

  const h1 = document.createElement('h1');
  h1.innerHTML = 'Hello world';

  const input = document.createElement('input');

  div.appendChild(h1);
  div.appendChild(input);

  return div;
}
