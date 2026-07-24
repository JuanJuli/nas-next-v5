# useMutate Hooks - Contoh Penggunaan

## Import
```typescript
import { useMutate, usePost, usePut, usePatch, useDelete } from "@/hooks/useMutate"
```

## Penggunaan Dasar

### 1. POST dengan JSON Data
```typescript
const MyComponent = () => {
  const { mutate, isPending, isError, error } = usePost("/api/users")

  const handleSubmit = () => {
    mutate(
      { 
        name: "John Doe", 
        email: "john@example.com" 
      },
      {
        onSuccess: (data) => {
          console.log("Success:", data)
        },
        onError: (error) => {
          console.error("Error:", error)
        }
      }
    )
  }

  return (
    <button onClick={handleSubmit} disabled={isPending}>
      {isPending ? "Loading..." : "Submit"}
    </button>
  )
}
```

### 2. POST dengan FormData
```typescript
const UploadComponent = () => {
  const { mutate, isPending } = usePost("/api/upload")

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)
    formData.append("name", "My File")

    mutate(formData)
  }

  return <input type="file" onChange={handleUpload} disabled={isPending} />
}
```

### 3. PUT untuk Update Data
```typescript
const UpdateComponent = () => {
  const { mutate } = usePut("/api/users/123", {
    invalidateQueries: ["users", "user-detail"],
    onSuccess: (data) => {
      message.success("Data berhasil diupdate")
    }
  })

  const handleUpdate = () => {
    mutate({
      name: "Jane Doe",
      email: "jane@example.com"
    })
  }

  return <button onClick={handleUpdate}>Update</button>
}
```

### 4. DELETE
```typescript
const DeleteComponent = () => {
  const { mutate, isPending } = useDelete("/api/users/123", {
    invalidateQueries: ["users"],
    onSuccess: () => {
      message.success("Data berhasil dihapus")
    }
  })

  return (
    <button onClick={() => mutate({})} disabled={isPending}>
      Delete
    </button>
  )
}
```

### 5. Menggunakan useMutate dengan Custom Method
```typescript
const CustomComponent = () => {
  const { mutate } = useMutate("/api/custom", {
    method: "PATCH",
    headers: {
      "X-Custom-Header": "value"
    },
    invalidateQueries: ["table"],
    onSuccess: (data) => {
      console.log("Success:", data)
    },
    onError: (error) => {
      console.error("Error:", error)
    }
  })

  return <button onClick={() => mutate({ status: "active" })}>Update Status</button>
}
```

## Options

### MutateOptions
- `method`: HTTP method (POST | PUT | PATCH | DELETE) - default: "POST"
- `headers`: Custom headers tambahan
- `invalidateQueries`: Array of query keys untuk di-invalidate setelah sukses
- `onSuccess`: Callback ketika request berhasil
- `onError`: Callback ketika request gagal

## Return Values

Hooks mengembalikan object dari `useMutation` dengan properties:
- `mutate`: Function untuk trigger mutation
- `mutateAsync`: Async version dari mutate
- `isPending`: Boolean loading state
- `isError`: Boolean error state
- `isSuccess`: Boolean success state
- `error`: Error object jika ada
- `data`: Response data jika sukses
- `reset`: Function untuk reset state

## Fitur Auto-Detect

Hooks akan otomatis mendeteksi tipe data:
- **FormData**: Headers tidak akan include `Content-Type` (browser akan set otomatis dengan boundary)
- **JSON**: Headers akan include `Content-Type: application/json`

## Authorization

Token authorization akan otomatis ditambahkan dari `useAuthStore`:
```
Authorization: Bearer <token>
```
