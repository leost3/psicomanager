/**
 * 
 * @returns fullname of a person
 */
export function fullNameOf(person: { firstName: string, lastName: string }) {
  const { firstName, lastName } = person
  return <span>{firstName} {lastName}</span>
}