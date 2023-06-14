export default function PostCard(post, Container, showButton = false) {
  const toDate = post.timestamp.toDate().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const buttons = /*html*/ `
  <div class="flex items-center gap-4">
    <button class='rounded-md bg-amber-400 text-white py-1 px-6 font-bold tracking-wide hover:opacity-50 transition-opacity'>EDIT</button>
    <button class='rounded-md bg-rose-500 text-white py-1 px-6 font-bold tracking-wide hover:opacity-50 transition-opacity'>DELETE</button>
  </div>
  `

  Container.insertAdjacentHTML(
    'beforeend', /*html*/`
      <div class="mt-6 flex flex-col w-[500px] shadow-lg rounded-lg p-6 min-h-[185px]" id="${post.id}">
        <div class="flex items-center justify-between">
          <p class='font-extralight'>${post.author}</p>
          <p class="font-light">${toDate}</p>
        </div>
        <h1 class='font-semibold text-2xl'>${post.title}</h1>
        <p class='mb-6'>${post.body}</p>
        <div class="flex items-center justify-between">
          <p class='font-bold'>${post.public ? 'Public' : 'Private'}</p>
          ${showButton ? buttons : ''}
        </div>
      </div>
    `
  )
}