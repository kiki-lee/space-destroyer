controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    
    projectile = sprites.createProjectileFromSprite(img`
            . . . . . . . . 
                    . . . . . . . . 
                    . . . . . . . . 
                    . . . . . . . . 
                    . . . 7 7 . . . 
                    . . . 7 7 . . . 
                    . . . 7 7 . . . 
                    . . . 7 7 . . .
        `, ship, 0, -140)
    projectile.startEffect(effects.coolRadial, 100)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_on_overlap(sprite: Sprite, otherSprite: Sprite) {
    sprite.destroy()
    otherSprite.destroy(effects.disintegrate)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_on_overlap2(sprite2: Sprite, otherSprite2: Sprite) {
    scene.cameraShake(4, 500)
    otherSprite2.destroy(effects.disintegrate)
    sprite2.startEffect(effects.fire, 200)
})
let projectile : Sprite = null
let ship : Sprite = null
let asteroids = [sprites.space.spaceSmallAsteroid1, sprites.space.spaceSmallAsteroid0, sprites.space.spaceAsteroid0, sprites.space.spaceAsteroid1, sprites.space.spaceAsteroid4, sprites.space.spaceAsteroid3]
ship = sprites.create(img`
        . . . . . . . c d . . . . . . . 
            . . . . . . . c d . . . . . . . 
            . . . . . . . c d . . . . . . . 
            . . . . . . . c b . . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . c 2 . . . . . . . 
            . . . . . . . f f . . . . . . . 
            . . . . . . . e 2 . . . . . . . 
            . . . . . . e e 4 e . . . . . . 
            . . . . . . e 2 4 e . . . . . . 
            . . . . . c c c e e e . . . . . 
            . . . . e e 2 2 2 4 e e . . . . 
            . . c f f f c c e e f f e e . . 
            . c c c c e e 2 2 2 2 4 2 e e . 
            c c c c c c e e 2 2 2 4 2 2 e e 
            c c c c c c e e 2 2 2 2 4 2 e e
    `, SpriteKind.Player)
ship.setStayInScreen(true)
ship.bottom = 110
controller.moveSprite(ship, 100, 100)
info.setLife(3)
effects.starField.startScreenEffect()
game.onUpdateInterval(500, function on_update_interval() {
    
    projectile = sprites.createProjectileFromSide(asteroids[randint(0, asteroids.length - 1)], 0, 75)
    projectile.setKind(SpriteKind.Enemy)
    projectile.x = randint(10, 150)
})
