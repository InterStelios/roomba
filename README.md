![alt text](https://raw.githubusercontent.com/stelioskiayias/roomba/master/images/roomba.png "Roomba")

### Getting Started
**Dependencies:**

 - node: ~=v5.12.0
 - npm: ~=3.8.6

**Note 1:** One of the project dependencies is [fabric](http://fabricjs.com/) and it is currently in a transition period over to v2. The tests run properly only with node v5 as other v6+ is out of scope for fabric v1.

**Note 2:** [fabric](http://fabricjs.com/) requires an old version of JSDOM for testing under node which requires [Python 2.7](https://www.python.org/download/releases/2.7/). If you want to run the tests under Windows/Linux you will need to install Python seperetely; MacOS is fine.

**Supported browsers:**

 - Chrome
 - Firefox
 - Safari
 - Microsoft Edge

**Checkout or download the source of this repository:**

    cd roomba
    npm install

**Building the project:**

	npm run build

This generates a build folder with the an index.html file.

**Running project in development:**

    npm run dev

The app is running on [localhost:8080](localhost:8080)


**Running project tests:**

    npm test
    npm test-watch

_See test output at the end of the readme._

**Instructions:**

 1. The room dimensions are specified by the sliders; left slider for X and right slider for Y coordinates. The dimensions are indicated by the grid size at the bottom left of the panel,  **Grid 10 x 10**.
 2. The location of the robot can be specified by clicking anywhere on the grid while holding down **Shift**. The coordinates of the mouse are indicated in the top panel, **Mouse (9, 8)**.
 3. The robot can be moved using the **arrow** keys and its position is also displayed and updated while the robot is moving **Robot (6, 6)**.
 4. The location of the patches can be specified by clicking anywhere on the grid. A patch is indicated by a grey colour on the tile. The panel also shows the patches left **Patches (11)** and the patches hoovered **Patches cleaned (2)**.

**Assumptions:**
1. Patches cannot be placed on robots.
2. When a robot is placed on a patch using the mouse, the patch is immediately cleared.
3. Minimum room size is (1, 1).
3. Maximum room size is (20, 20).

**Notes:**
1. The default DOM range sliders are used for simplicity. Ideally, we should use a more extensive range slider library which will indicate the selected values (the ticks).
2. [fabric](http://fabricjs.com/) was used for aiding manipulation of simple shapes on a canvas. Admittedly, this adds a dependency which is a restriction but it was done for the sake of this simple exercise.
3. Testing covers many cases and the core functionality but it is in no way 100% complete.

**Test output:**
![alt text](https://raw.githubusercontent.com/stelioskiayias/roomba/master/images/test_output.png "Test output")

