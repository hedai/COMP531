import { expect } from 'chai'
import particle from './particle'
import { update } from './particle'

describe('Particle Functionality', () => {

    var canvas = {width:800,height:800}

    it('should have default values', () => {
        const p = particle({})
        expect(p).to.be.ok
        expect(p.missingAttribute).to.not.be.ok
        // check position, velocity, acceleration, mass
        expect(p.position).to.be.ok
        expect(p.velocity).to.be.ok
        expect(p.acceleration).to.be.ok
        expect(p.mass).to.be.ok
    })

    it('should update the position by the velocity', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 1.0, canvas)
        expect(position[0]).to.be.closeTo(1.5, 0.01)
        expect(position[1]).to.be.closeTo(0.5, 0.01)
    })

    it('should update the position by the velocity and time delta', () => {
        const p = particle({ position: [1, 1], velocity: [0.5, -0.5] })
        const { position } = update(p, 2.0, canvas) // dt is different here
        expect(position[0]).to.be.closeTo(2.0, 0.01)
        expect(position[1]).to.be.closeTo(0.0, 0.01)
    })


    it('should update the velocity by the acceleration', () => {
        // similar to the previous check
        const p = particle({ velocity: [1, 1], acceleration: [0.5, -0.5] })
        const { velocity } = update(p, 1.0, canvas)
        // expect(velocity).to.equal([1.5, 0.5]) 
        expect(velocity[0]).to.closeTo(1.5, 0.01)
        expect(velocity[1]).to.closeTo(0.5, 0.01)         
    })

    it('particles should wrap around the world', () => {
        // create a particle with position outside
        // of the canvas area.  update() should
        // bring the particle back inside
        // check all four sides
        // expect(1).to.equal(1)
        // update(p, 3.521, { width:111, height: 222 })
        const p = particle({ position: [-200, 900], velocity: [0.5, -0.5] })
        const { position } = update(p, 1, canvas)
        expect(position[0] <= canvas.width).to.be.true
        expect(position[0] >= 0).to.be.true
        expect(position[1] <= canvas.height).to.be.true
        expect(position[1] >= 0).to.be.true

    })

})