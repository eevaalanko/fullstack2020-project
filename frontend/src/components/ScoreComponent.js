import React from 'react'
import { useQuery } from '@apollo/client'

const ScoreComponent = (props) => {
/*  const result = useQuery('GET_SCORE', {
    pollInterval: 2000
  }) */

  const result = {loading : false}

  // eslint-disable-next-line react/prop-types
  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      Tulos on: 10000 TODO: set score
    </div>
  )
}

export default ScoreComponent
