/**
 * @swagger
 * /api/lessons:
 *  post:
 *      tags: [lessons]
 *      summary: Create new lessons
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          title:
 *                              type: string
 *                              description: The lessons title.
 *                              example: Russian language
 *                          class:
 *                              type: integer
 *                              description: What class is this subject for.
 *                              example: 8
 *                          days:
 *                              type: array[integer]
 *                              description: Days of the week for which you need to create classes.
 *                              example: 0,1,4,6
 *                          firstDate:
 *                              type: date
 *                              description: The first date from which to create classes.
 *                              example: 2022-05-17
 *                          lastDate:
 *                              type: date
 *                              description: The last date from which to create classes.
 *                              example: 2022-05-17
 *                          lessonsCount:
 *                              type: integer
 *                              description: Number of classes. This parameter is mutually exclusive with lastDate
 *                              example: 6
 *      responses:
 *          200:
 *              description: Lessons ids array
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: array[integer]
 *                                  description: The array lesson id.
 *                                  example: [1,2,3,4]
 *          400:
 *              description: RangeError.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Something went wrong, try again.
 *                              error:
 *                                  type: string
 *                                  example: Нет свободных учителей!
 *          500:
 *              description: Serverside error.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Something went wrong, try again.
 *                              error:
 *                                  type: string
 *                                  example: Error.
 * /api/lessons/?param=:
 *  get:
 *      tags: [lessons]
 *      summary: Get list lessons with different parameters.
 *      description: There may be several parameters or there may not be any at all, if there are no parameters, the request will return all classes
 *      parameters:
 *      - in: query
 *        name: page
 *        required: true
 *        description: Pagination page number.
 *        schema:
 *            type: integer
 *            example: 1
 *      - in: query
 *        name: lessonsPerPage
 *        description: Number of classes per page.
 *        schema:
 *            type: integer
 *            example: 20
 *      - in: query
 *        name: title
 *        description: Search by lesson name.
 *        schema:
 *            type: string
 *            example: Russian language
 *      - in: query
 *        name: class
 *        description: Search by one or more classes.
 *        schema:
 *            type: integer or array[integer]
 *            example: 7,8
 *      - in: query
 *        name: date
 *        description: Search by date, either by one or by range.
 *        schema:
 *            type: date or array[date]
 *            example: 2022-05-17,2022-05-20
 *      - in: query
 *        name: teacherIds
 *        description: Search by teachers, either one or more teachers.
 *        schema:
 *            type: integer or array[integer]
 *            example: 1,2
 *      - in: query
 *        name: status
 *        description: Search by status.
 *        schema:
 *            type: integer
 *            example: 1
 *      produces:
 *         application/json
 *      responses:
 *          200:
 *              description: Lessons array
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: integer
 *                                  description: The lesson id.
 *                                  example: 1
 *                              title:
 *                                  type: string
 *                                  description: The lessons title.
 *                                  example: Russian language
 *                              class:
 *                                  type: integer
 *                                  description: The lesson class.
 *                                  example: 7
 *                              studentsCount:
 *                                  type: integer
 *                                  description: The number of students who will attend this class.
 *                                  example: 20
 *                              date:
 *                                  type: date
 *                                  description: Date of the lesson.
 *                                  example: 2022-05-17
 *                              teacher:
 *                                  type: object
 *                                  description: Teacher of the lesson.
 *                                  example: {id: 1, name: Svetlana}
 *          500:
 *              description: Serverside error.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Something went wrong, try again.
 *                              error:
 *                                  type: string
 *                                  example: Error.
 * /api/lessons/{id}:
 *  get:
 *      tags: [lessons]
 *      summary: Get one lesson with students list.
 *      description: getting one class with a list of students.
 *      parameters:
 *      - in: params
 *        name: id
 *        required: true
 *        description: Id for lesson.
 *        schema:
 *            type: integer
 *            example: 1
 *      produces:
 *         application/json
 *      responses:
 *          200:
 *              description: Information about the lesson.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              id:
 *                                  type: integer
 *                                  description: The lesson id.
 *                                  example: 1
 *                              title:
 *                                  type: string
 *                                  description: The lessons title.
 *                                  example: Russian language
 *                              class:
 *                                  type: integer
 *                                  description: The lesson class.
 *                                  example: 7
 *                              date:
 *                                  type: date
 *                                  description: Date of the lesson.
 *                                  example: 2022-05-17
 *                              students:
 *                                  type: array[object]
 *                                  description: Students of the lesson.
 *                                  example: [{id: 1, name: Petya},{id: 2, name: Vasya}]
 *          400:
 *              description: Not found error.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Something went wrong, try again.
 *                              error:
 *                                  type: string
 *                                  example: Данный предмет не найден.
 *          500:
 *              description: Serverside error.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Something went wrong, try again.
 *                              error:
 *                                  type: string
 *                                  example: Error.
 * /api/lessons/:id:
 *  delete:
 *      tags: [lessons]
 *      summary: Delete one lesson.
 *      parameters:
 *      - in: params
 *        name: id
 *        required: true
 *        description: Id for lesson.
 *        schema:
 *            type: integer
 *            example: 1
 *      produces:
 *         application/json
 *      responses:
 *          200:
 *              description: Information about delete lesson.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Занятие успешно удалено.
 *          400:
 *              description: Not found error.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Something went wrong, try again.
 *                              error:
 *                                  type: string
 *                                  example: Занятие не удалено, попробуйте еще раз!
 *          500:
 *              description: Serverside error.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Something went wrong, try again.
 *                              error:
 *                                  type: string
 *                                  example: Error.
 * /api/lessons/status/:id:
 *  patch:
 *      tags: [lessons]
 *      summary: Update status for lesson.
 *      parameters:
 *      - in: params
 *        name: id
 *        required: true
 *        description: Id for lesson.
 *        schema:
 *            type: integer
 *            example: 1
 *      produces:
 *         application/json
 *      responses:
 *          200:
 *              description: Information about update status for lesson.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Статус занятия успешно обнавлен.
 *          500:
 *              description: Serverside error.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Something went wrong, try again.
 *                              error:
 *                                  type: string
 *                                  example: Error.
 */
