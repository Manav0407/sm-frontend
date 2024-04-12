import React from 'react';
import Stories from 'react-insta-stories';
const Temp = () => {

    const arr = ["E:/MERN/socialMedia/sm/public/1.jpg"]
  return (
    <Stories
			stories={arr}
			defaultInterval={1500}
			width={432}
			height={768}
		/>
  )
}

export default Temp;