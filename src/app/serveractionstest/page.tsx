import React from 'react';
import { sayHello } from '@/lib/actions'

function page() {
  return (
    <div>
      <form action={sayHello}>
        <button>click</button>
      </form>
    </div>
  )
}

export default page