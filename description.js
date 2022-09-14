/**
 * 1. Login Api should return two types of token:
 * 
 *  a.access_token - 60 seconds
 *  b.refresh_token - 600 seconds
 * 
 *  Controller
 * -----------------------------------------
 * 2. Api to refresh the Access token will be :
 *       GET/mba/api/v1/accessTokens
 * 
 *      Header : x-refreash-token
 *  (Route + controller)
 */


/**
 * 
 * /**
 * 
 * 1. Add a ticket price field for each theatres
 * 
 * 
 * Use cases :
 * 
 * Part 1 :
 * 1. Any one trying to do the ticket booking need to call the booking service
 * with following details :
 * 
 *     Theater Id
 *     Movie Id
 *     DateTime
 *     No of tickets
 * 
 * Booking service should return the booking id, which will be in 
 * the current state of IN_PROGRESS
 * 
 * BOOKING can have following statuses :
 * 1. IN_PROGRESS
 * 2. COMPLETED
 * 3. CANCELLED
 * 4. FAILED
 * 
 * 
 * 2. User should be able to do the crud opetations on the booking
 * 
 *        - Use  can cancel the booking
 *        - User can change the number of tickets / movie / theatre
 * 
 * =====================================================================
 * 
 * Part 2 :
 * 
 * 2. User shoudld be able to make the payment on the booking previously done
 * 
 *       - booking_id
 *       - amount
 * 
 *    POST  /mba/api/v1/payments
 * 
 *       {
 *           bookingId :
 *           amount :
 *        }
 *    Only by the owner of the booking
 * 
 *      **** Payment should happen withing 60 seconds of booking, else it should
 *      be failed
 *  
 * 
 *      Successful payment should update the booking to COMPLETED
 * 
 * 
 * 
 * 
 * 
 * 
 * Booking Model  : 
 * 
 *     theatreId (ref)
 *     movieId (ref)
 *     userId (ref)
 *     timing
 *     status ( IN_PROGRESS | COMPLETED | CANCELLED | FAILED) 
 *     noOfSeats
 *     totalCost
 *     createdAt
 *     updatedAt
 * 
 * 
 * 
 * Payment Model :
 *     bookingId ( ref )
 *     amount
 *     status ( IN_PROGRESS | FAILED | SUCCESS )
 *     createdAt
 *     updatedAt
 * 
 * 
 * 
 * Booking
 *     
 *     POST  /mba/api/v1/bookings
 *        
 *        Any authenticated user
 * 
 *     PUT  /mba/api/v1/bookings
 * 
 *          Owner of the booking or ADMIN
 * 
 *     GET  /mba/api/v1/bookings
 * 
 *          Owner will get only his bookings
 *          ADMIN will get all the bookings
 * 
 *     GET  /mba/api/v1/bookings/:id
 *         
 *          Owner will get only his bookings
 *          ADMIN will get all the bookings
 *        
 *     
 * 
 */