import React from 'react'

function RightSideBar() {
  return (
    <section className=' custom-scrollbar sticky right-0 top-0 z-20 flex h-screen w-fit flex-col justify-between gap-12 overflow-auto border-l border-l-dark-4 bg-dark-2 px-10 pb-6 pt-28 max-xl:hidden'>
      <div className="flex flex-col flex-1 justify-start">
        <h3 className="heading-text-4 text-light-2">suggested cummunities</h3>
      </div>
      <div className="flex flex-col flex-1 justify-start">
        <h3 className="heading-text-4 text-light-2">suggested users</h3>
      </div>
    </section>
  )
}

export default RightSideBar