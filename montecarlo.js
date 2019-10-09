const   start         = document.querySelector(".btn-start"),
        output_total  = document.getElementById('total'),
        output_inside = document.getElementById('inside'),
        output_pi     = document.getElementById('pi'),
        svg           = document.getElementsByTagName('svg')[0];

let perform_acceleration = true,
    show_graphics        = true,
    total                = 0,
    inside               = 0;


if(!show_graphics) svg.remove();

// Returns a random floating point number between -1 and 1
function randomSingleCoordinate(){
    return((Math.random() * 2) - 1);
}

// Randomly I add a point to the simulation
function addPoint(){
    // Randomly I generate a point
    let x = randomSingleCoordinate(), y = randomSingleCoordinate(),
        is_inside_circle = (((x*x)+(y*y)) < 1); // if point is inside wheel

    total++;
    if(is_inside_circle) inside++;
    if(show_graphics){ // Now, I draw the point to the SVG
        let point = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
        point.setAttribute('x', (x + 1) * 300);
        point.setAttribute('y', (y + 1) * 300);
        point.setAttribute('width', 1);
        point.setAttribute('height', 1);
        if(is_inside_circle) point.setAttribute('class', 'inside');
        svg.appendChild(point);
  }
}

function monteCarlo(){
  var pointsToAdd = 1;
  if(total > 0 && perform_acceleration) pointsToAdd = Math.pow((Math.floor(Math.log10(total))+1),3);
  // add one or more points
  for(var i = 0; i < pointsToAdd; i++) addPoint();
  // Update output
  output_total.innerHTML = total;
  output_inside.innerHTML = inside;
  output_pi.innerHTML = inside / total * 4;
  // Loop
  let stop_after = document.querySelector("#stopAfter").value;
  if(total < stop_after) setTimeout(monteCarlo, 0.5);
}
start.addEventListener("click", monteCarlo);