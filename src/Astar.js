class priorityQueue{
    constructor(){
        this.nodes = []
    }
    enqueue(priority1, priority2, state){
        this.nodes.push({priority1, priority2, state})
        this.nodes.sort((a, b) => {
            if (a.priority1 === b.priority1) {
              return a.priority2 - b.priority2;  // Compare by heuristic if total cost is the same
            }
            return a.priority1 - b.priority1;  // Compare by total cost (f(n))
          });
    }
    dequeue(){
        return this.nodes.shift().state;
    }
    isEmpty(){
        if(this.nodes.length===0)    return true
        return false
    }
}

function heuristicValue(state){
    // Manhatten distance
    let h = 0, m=state.length, n=state[0].length
    for(let i=0; i<m; i++){
        for(let j=0; j<n; j++){
            h+=(Math.abs((state[i][j]-1)/m-i)+Math.abs((state[i][j]-1)%n-j))
        }
    }
    return h
}

function findPosition(state, find){
    for(let i=0; i<state.length; i++){
        for(let j=0; j<state[0].length; j++){
            if(state[i][j]===find)  return [i, j]
        }
    }
    return []
}

function inRange(x, y, m, n){
    if(0<=x && x<m && 0<=y && y<n)  return true
    return false
}

function getNeighbors(state){
    console.log("finding neighbours for: ", state)
    const neighbors = []
    const [x, y] = findPosition(state, 0)
    console.log(x, y)
    const moves = [[-1, 0], [0, -1], [1, 0], [0, 1]]
    for(let d of moves){
        // nx, ny -> new position for 0
        const nx = x + d[0]
        const ny = y + d[1]
        if(inRange(nx, ny, state.length, state[0].length)){
            const newState = state.map((row)=>[...row])
            newState[x][y]=state[nx][ny]
            newState[nx][ny]=0
            neighbors.push(newState)
            // console.log(newState)
        }
    }
    return neighbors
}

function isGoal(state){
    // console.log("checking isgoal:", state)
    for(let i=0; i<state.length; i++){
        for(let j=0; j<state[0].length; j++){
            if(state[i][j]!==0 && state[0].length*i+j+1!==state[i][j]) return false
        }
    }
    console.log("returned true")
    return true
}

function aStar(state){
    console.log("in A* function")
    const pq = new priorityQueue()
    const visited = new Set()

    const cameFrom = new Map()  // {state, state}
    const gScore = new Map()    // {state, gscore}  -> start to current
    const fScore = new Map()    // {state, fscore}  -> approx start to goal

    gScore.set(state, 0)
    fScore.set(state, heuristicValue(state))  // h+0 here, bcz g=0
    pq.enqueue(fScore[state], heuristicValue(state), state)

    while(!pq.isEmpty()){
        const currState = pq.dequeue()
        // console.log(currState)
        if(isGoal(currState)){
            console.log("goal reached")
            return reconstructPath(cameFrom, currState)  // can be goal at currState place also
        }
        visited.add(currState)

        const neighbors = getNeighbors(currState)
        // console.log("neighbors:", neighbors)
        neighbors.forEach((neighbor)=>{
            if(visited.has(neighbor))  return
            // console.log("for: ", neighbor)

            const tempGScore = gScore.get(currState)+1
            console.log("tempGScore: ", tempGScore, gScore.has(neighbor))
            if(!gScore.has(neighbor) || tempGScore<gScore.get(neighbor)){
                console.log("in if: ")
                cameFrom.set(neighbor, currState)
                gScore.set(neighbor, tempGScore)
                fScore.set(neighbor, gScore.get(neighbor)+heuristicValue(neighbor))

                if (!pq.nodes.some(n => n.state === neighbor)) {
                    console.log("inserting in priority queue")
                    pq.enqueue(fScore.get(neighbor), heuristicValue(neighbor), neighbor);  // Add to open list
                }
            }
        })
    }
    return null
}

// in Astar
// will change scores when
// 1) score does not exit, means visiting first time
// 2) exist but is greater than current

function reconstructPath(cameFrom, currState){
    console.log("finding path")
    const path = []
    while(cameFrom.has(currState)){
        path.unshift(currState)
        currState = cameFrom.get(currState)
    }
    return path
}

export default aStar;


    // let ans=false
    // state.forEach((row, rowIndex)=>{
    //     row.forEach((val, colIndex)=>{
    //         console.log(state[0].length*rowIndex+colIndex+1, val)
    //         if(val!==0 && state[0].length*rowIndex+colIndex+1!==val) return false
    //     })
    // })