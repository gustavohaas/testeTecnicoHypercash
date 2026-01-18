import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getUsers, createUser, deleteUser } from "@/services/users"

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })
}
