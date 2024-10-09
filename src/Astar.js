class priorityQueue{
    constructor(){
        this.nodes = []
    }
    enqueue(priority, state){
        this.nodes.push({priority, state})
        this.nodes.sort((a, b)=>a.priority - b.priority)
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
    state.forEach((row, rowIndex)=>{
        row.forEach((val, colIndex)=>{
            if(val===find)  return [rowIndex, [colIndex]]
        })
    })
    return []
}

function inRange(x, y, m, n){
    if(0<=x && x<m && 0<=y && y<n)  return true
    return false
}

function getNeighbors(state){
    const neighbors = []
    const [x, y] = findPosition(state, 0, state.length, state[0].length)
    const moves = [[-1, 0], [0, -1], [1, 0], [0, 1]]
    moves.forEach(([dx, dy])=>{
        const nx = x + dx
        const ny = y + dy
        if(inRange(x, y)){
            const newState = state.forEach((row)=>[...row])
            newState[nx][ny]=state[x][y]
            newState[x][y]=0
            neighbors.push(newState)
        }
    })
    return neighbors
}

function isGoal(state){
    console.log("checking isgoal:", state)
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
    pq.enqueue(fScore[state], state)

    while(!pq.isEmpty()){
        const currState = pq.dequeue()
        if(isGoal(currState)){
            console.log("goal reached")
            return reconstructPath(cameFrom, currState)  // can be goal at currState place also
        }
        console.log(currState)
        visited.add(currState)

        const neighbors = getNeighbors(currState)
        neighbors.forEach((neighbor)=>{
            if(visited.has(neighbor))  return

            const tempGScore = gScore.get(currState)+1
            if(!gScore.has(neighbor) && tempGScore<gScore.get(neighbor)){
                cameFrom.set(neighbor, currState)
                gScore.set(neighbor, tempGScore)
                fScore.set(neighbor, gScore(neighbor)+heuristicValue(neighbor))

                if (!pq.nodes.some(n => n.state === neighbor)) {
                    pq.enqueue(fScore.get(neighbor), neighbor);  // Add to open list
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