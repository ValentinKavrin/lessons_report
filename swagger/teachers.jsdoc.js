/**
 * @swagger
 * paths:
 *  /api/teachers:
 *      post:
 *          tags: [teachers]
 *          summary: Create new teacher
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  description: The student name.
 *                                  example: Oksana Petrovna
 *                              discipline:
 *                                  type: integer
 *                                  description: Student's class number.
 *                                  example: Mathematics
 *          responses:
 *              201:
 *                  description: Student object
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  id:
 *                                      type: integer
 *                                      description: The student id.
 *                                      example: 1
 *                                  name:
 *                                      type: string
 *                                      description: The student name.
 *                                      example: Oksana Petrovna
 *                                  discipline:
 *                                      type: integer
 *                                      description: Student's class number.
 *                                      example: Mathematics
 *                                  username:
 *                                      type: string
 *                                      description: The student username to log in to the service.
 *                                      example: Oksana16151651616
 *                                  password:
 *                                      type: string
 *                                      description: The student password to log in to the service.
 *                                      example: dfmosfafd529
 *              400:
 *                  description: Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Something went wrong, try again.
 *                                  error:
 *                                      type: string
 *                                      example: Content can not be empty!
 *              500:
 *                  description: Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Something went wrong, try again.
 *                                  error:
 *                                      type: string
 *                                      example: Error.
 *      get:
 *          tags: [teachers]
 *          summary: Get list teachers.
 *          responses:
 *              201:
 *                  description: Teachers array
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array[object]
 *                              description: The array students.
 *                              example: [{id: 1, name: Oksana Petrovna, discipline: Mathematics}, {id: 2, name: Oksana Petrovna, discipline: Mathematics}]
 *              500:
 *                  description: Error
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Something went wrong, try again.
 *                                  error:
 *                                      type: string
 *                                      example: Error.
 *  /api/teachers/:id:
 *      put:
 *          tags: [teachers]
 *          summary: Route for changing teacher.
 *          parameters:
 *          - in: query
 *            name: id
 *            required: true
 *            description: Teacher id.
 *            schema:
 *                type: integer
 *                example: 1
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              name:
 *                                  type: string
 *                                  description: The student name.
 *                                  example: Marina Petrovna.
 *          responses:
 *              200:
 *                  description: New student
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                      message:
 *                                          type: string
 *                                          example: Данные пользователя успешно обновлены.
 *              404:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Something went wrong, try again.
 *                                  error:
 *                                      type: string
 *                                      example: Пользователя с таким id не существует.
 *              400:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Something went wrong, try again.
 *                                  error:
 *                                      type: string
 *                                      example: Content can not be empty.
 *              500:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Something went wrong, try again.
 *                                  error:
 *                                      type: string
 *                                      example: Error.
 *      delete:
 *          tags: [teachers]
 *          summary: Route for delete teacher.
 *          parameters:
 *          - in: query
 *            name: id
 *            required: true
 *            description: Student id.
 *            schema:
 *                type: integer
 *                example: 1
 *          responses:
 *              200:
 *                  description: Delete successfully
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Удаление прошло успешно.
 *              400:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Something went wrong, try again.
 *                                  error:
 *                                      type: string
 *                                      example: Пользователь уже удален или не найден.
 *              500:
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  message:
 *                                      type: string
 *                                      example: Something went wrong, try again.
 *                                  error:
 *                                      type: string
 *                                      example: Error.
 */